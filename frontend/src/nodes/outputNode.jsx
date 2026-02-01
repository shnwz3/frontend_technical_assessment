
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { TextField, SelectField } from '../components/NodeFields.jsx';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={Upload}
      inputs={[{ id: 'value' }]}
    >
      <TextField
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter output name"
      />
      <SelectField
        label="Type"
        value={outputType}
        onChange={handleTypeChange}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]}
      />
    </BaseNode>
  );
};
