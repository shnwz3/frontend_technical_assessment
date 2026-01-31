// transformNode.jsx - Data Transformation Node

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { SelectField, TextAreaField } from '../components/NodeFields.jsx';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'json_parse');
  const [expression, setExpression] = useState(data?.expression || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon={RefreshCw}
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <SelectField
        label="Transform"
        value={transformType}
        onChange={(e) => setTransformType(e.target.value)}
        options={[
          { value: 'json_parse', label: 'Parse JSON' },
          { value: 'json_stringify', label: 'Stringify JSON' },
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim Whitespace' },
          { value: 'split', label: 'Split String' },
          { value: 'custom', label: 'Custom Expression' }
        ]}
      />
      {transformType === 'custom' && (
        <TextAreaField
          label="Expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. data.map(x => x.value)"
          rows={2}
        />
      )}
    </BaseNode>
  );
};
