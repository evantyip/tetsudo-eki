import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'antd';

// useRequest
// Description:
//
// custom hook to perform an axios request
// and return any errors
interface useRequestParameters {
  url: string;
  method: string;
  body: any;
  onSuccess: (data:any) => any;
}

interface error {
  message: string;
  field?: string;
}

const useRequest = ({ url, method, body, onSuccess }: useRequestParameters) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      // @ts-ignore
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        err.response.data.errors.map((err: error) => {
          return (
            <Alert
              showIcon
              description={err.message}
              closable
              message="Error"
              type="error"
            />
          );
        })
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
