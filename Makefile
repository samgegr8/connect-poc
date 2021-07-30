CHANGESETNAME := $(shell date "+A%Y-%m-%d-%H-%M-%S")
CURRENT_ACCOUNT := $(shell aws iam list-account-aliases --query 'AccountAliases[0]' --output text)
ACCOUNT_lab-sandpit1 = lab-sandpit1
ACCOUNT_sandbox = testing-sandbox
DESIRED_ACCOUNT = ${ACCOUNT_${ENVIRONMENT}}
_check-account:
ifneq ($(CURRENT_ACCOUNT), $(DESIRED_ACCOUNT))
	$(error Found: $(CURRENT_ACCOUNT) account for environment $(DESIRED_ACCOUNT). You are trying to run this from the wrong account)
endif

_cfn_lint:
	@mkdir -p outputs
	@echo "<html><body><pre>" > outputs/cfnlint-output.html
	@cfn-lint template/lambda.yaml --format parseable >> outputs/cfnlint-output.html
	@echo "</pre><h1>Excellent work! No issues found!</h1><img src='https://media.giphy.com/media/rT6bAA9A7A1Ne/giphy.gif'/></body></html>" >> outputs/cfnlint-output.html

lint:
	@echo "Running cfn-lint on lambda templates" && cfn-lint template/*.yaml && echo "All good!"

build-lambda: _check-account
	@./deploy-lambda.sh -n $(DESIRED_ACCOUNT)-connect-lambda -f lambda -p lambda-$(ENVIRONMENT) -s $(ENVIRONMENT)-lambda-connect-stack

build-dynamodb: _check-account
	@./deploy-infra.sh -d template -n $(DESIRED_ACCOUNT)-connect-dynamodb -f dynamodb -p dynamodb-$(ENVIRONMENT)

