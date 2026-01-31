// conditionNode.jsx - Conditional Branching Node

import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { TextField, SelectField } from '../components/NodeFields.jsx';

export const ConditionNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon={GitBranch}
      inputs={[{ id: 'input' }]}
      outputs={[
        { id: 'true' },
        { id: 'false' }
      ]}
    >
      <TextField
        label="Field"
        value={field}
        onChange={(e) => setField(e.target.value)}
        placeholder="Field to check"
      />
      <SelectField
        label="Operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' }
        ]}
      />
    </BaseNode>
  );
};
