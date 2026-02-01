import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { TextField, SelectField } from '../components/NodeFields.jsx';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API"
      icon={Globe}
      inputs={[
        { id: 'headers' },
        { id: 'body' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter API endpoint"
      />
      <SelectField
        label="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]}
      />
    </BaseNode>
  );
};
