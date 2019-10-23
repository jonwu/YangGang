from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
import traceback


# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError:
        # Encountered some likely formatting/validation error.
        traceback.print_exc()
        raise
    except (ConnectionError, HTTPError):
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        traceback.print_exc()
        raise

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        pass # TODO: handle this case
    except PushResponseError as exc:
        # Encountered some other per-notification error.
        traceback.print_exc()
