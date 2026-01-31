// inputNode.jsx

import { useState } from 'react';
import { Download } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { TextField, SelectField } from '../components/NodeFields.jsx';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={Download}
      outputs={[{ id: 'value' }]}
    >
      <TextField
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter input name"
      />
      <SelectField
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]}
      />
    </BaseNode>
  );
};
