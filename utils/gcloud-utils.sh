error_and_exit() {
  local MESSAGE="${1}"
  local HINT="${2}"
  local FILENAME="${3}"
  echo ""
  echo "🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥"
  echo ""
  echo "Error $FILENAME"
  echo "===================="
  echo ""
  echo "Message"
  echo "-------"
  echo "$MESSAGE"
  echo ""
  echo "Hint"
  echo "----"
  echo "$HINT"
  echo ""
  echo "/end"
  echo ""
  exit 1
}

gcloud_config() {
  ## private variables

  __GCP_SERVICE_ACCOUNT_KEY_PRIVATE_KEY_DATA_FILE_NAME=local-service-account-key-private-key-data.txt
  __GCP_SERVICE_ACCOUNT_KEY_FILE_NAME=local-service-account-key-file.json

  ## cleanup tmp files

  rm --force $__GCP_SERVICE_ACCOUNT_KEY_PRIVATE_KEY_DATA_FILE_NAME
  rm --force $__GCP_SERVICE_ACCOUNT_KEY_FILE_NAME
  rm --force deploy.env
  rm --force local-output.log

  ## extract service account key file

  case "$GCP_SERVICE_ACCOUNT_KEY" in
    *privateKeyData*)
      echo "🟩🟩 '.privateKeyData' found"
      echo "$GCP_SERVICE_ACCOUNT_KEY" | jq --raw-output '.privateKeyData' >$__GCP_SERVICE_ACCOUNT_KEY_PRIVATE_KEY_DATA_FILE_NAME
      base64 --decode $__GCP_SERVICE_ACCOUNT_KEY_PRIVATE_KEY_DATA_FILE_NAME >$__GCP_SERVICE_ACCOUNT_KEY_FILE_NAME
      ;;
    *private_key_data*)
      echo "🟩🟩 '.private_key_data' found"
      echo "$GCP_SERVICE_ACCOUNT_KEY" | jq --raw-output '.private_key_data' >$__GCP_SERVICE_ACCOUNT_KEY_FILE_NAME
      ;;
    *)
      error_and_exit "Failed to extract service account key file" "Did you setup a service account?"
      ;;
  esac

  ## gcloud auth and configure

  gcloud auth activate-service-account --key-file $__GCP_SERVICE_ACCOUNT_KEY_FILE_NAME || error_and_exit "Failed to activate service account"
  gcloud config set project "$GCP_PROJECT_ID" || error_and_exit "Failed to set GCP project"
}
