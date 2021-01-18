import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'antd';

// useRequest
// Description:
//
// custom hook to perform an axios request
// and return any errors

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        err.response.data.errors.map((err) => {
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
