source gcloud-utils.sh

## required environment variables
if [[ -z "$GCP_PROJECT_ID" ]]; then
  error_and_exit "\$GCP_PROJECT_ID is not set" "Did you setup a service account?"
fi

if [[ -z "$GCP_SERVICE_ACCOUNT" ]]; then
  error_and_exit "\$GCP_SERVICE_ACCOUNT is not set" "Did you setup a service account?"
fi

if [[ -z "$GCP_SERVICE_ACCOUNT_KEY" ]]; then
  error_and_exit "\$GCP_SERVICE_ACCOUNT_KEY is not set" "Did you setup a service account?"
fi

if [[ -z "$CI_PROJECT_ID" ]]; then
  error_and_exit "\$CI_PROJECT_ID is not set"
fi

if [[ -z "$CI_COMMIT_REF_SLUG" ]]; then
  error_and_exit "\$CI_COMMIT_REF_SLUG is not set"
fi

## optional environment variables
GCP_REGION="${GCP_REGION:-us-central1}"
GCP_CLOUD_RUN_MAX_INSTANCES="${GCP_CLOUD_RUN_MAX_INSTANCES:-100}"
GCP_CLOUD_RUN_MIN_INSTANCES="${GCP_CLOUD_RUN_MIN_INSTANCES:-1}"
GCP_CLOUD_RUN_TIMEOUT="${GCP_CLOUD_RUN_TIMEOUT:-300}"
GCP_CLOUD_RUN_CONCURRENCY="${GCP_CLOUD_RUN_CONCURRENCY:-80}"
GCP_CLOUD_RUN_MEMORY="${GCP_CLOUD_RUN_MEMORY:-512Mi}"
GCP_CLOUD_RUN_CPU="${GCP_CLOUD_RUN_CPU:-1000m}"

## private variables
SERVICE_NAME="gitlab-$CI_PROJECT_ID-$CI_COMMIT_REF_SLUG"

gcloud_config

## gcloud run deploy
gcloud run deploy "$SERVICE_NAME" --quiet --source=. --region="$GCP_REGION" \
  --max-instances="$GCP_CLOUD_RUN_MAX_INSTANCES" --min-instances="$GCP_CLOUD_RUN_MIN_INSTANCES" \
  --timeout="$GCP_CLOUD_RUN_TIMEOUT" \
  --concurrency="$GCP_CLOUD_RUN_CONCURRENCY" \
  --memory="$GCP_CLOUD_RUN_MEMORY" \
  --cpu="$GCP_CLOUD_RUN_CPU" \
  --env-vars-file="$GCP_CLOUD_RUN_ENV" \
  --allow-unauthenticated --format 'value(status.url)' >>local-output.log || error_and_exit "Failed to deploy service"

## generate deploy.env
echo "DYNAMIC_URL=$(cat local-output.log)" >>deploy.env || error_and_exit "Failed to decode service account key"
