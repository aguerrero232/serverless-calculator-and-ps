import json

def calc(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    
    ## Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        ## Allows GET requests from any origin with the Content-Type
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)   
    ## Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    data = request.get_json()
    error_str = f"\nProvide two numbers and an operation.\nrequest: {data}"
    error_str2 = f"\nProvide a valid operation.\nrequest: {data}"

    if 'num1' in data and 'num2' in data and 'op' in data:
      num1, num2, op = data['num1'], data['num2'], data['op'] 
    else:
      return (error_str, 400, headers)

    num1 = float(num1) if num1 else 'error'
    if not isinstance(num1, (float, int)):
      response = (error_str, 400, headers)
    
    num2 = float(num2) if num2 else 'error'
    if not isinstance(num2, (float, int)):
      response = (error_str, 400, headers)
    
    op = 'error' if not op else op
    if op == 'error':
      response = (error_str, 400, headers)
    
    if op == 'add':
      response = (f'{num1 + num2}', 200, headers)
    elif op == 'sub':
      response = (f'{num1 - num2}', 200, headers)
    elif op == 'mul':
      response = (f'{num1 * num2}', 200, headers)
    elif op == 'div':
      response = (f'{num1 / num2}', 200, headers) if num2 > 0.0 else (f'Can\'t divide by 0', 400, headers)
    elif op == 'pow':
      response = (f'{pow(num1, num2)}', 200, headers)
    else:
      response = (error_str2, 400, headers)
    
    return response