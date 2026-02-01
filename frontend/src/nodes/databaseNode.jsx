
import { useState } from 'react';
import { Database } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { SelectField, TextAreaField } from '../components/NodeFields.jsx';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'postgres');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users');

  return (
    <BaseNode
      id={id}
      title="Database"
      icon={Database}
      inputs={[
        { id: 'connection' },
        { id: 'params' }
      ]}
      outputs={[
        { id: 'result' },
        { id: 'error' }
      ]}
    >
      <SelectField
        label="Database"
        value={dbType}
        onChange={(e) => setDbType(e.target.value)}
        options={[
          { value: 'postgres', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'mongodb', label: 'MongoDB' },
          { value: 'sqlite', label: 'SQLite' }
        ]}
      />
      <TextAreaField
        label="Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter SQL query..."
        rows={2}
      />
    </BaseNode>
  );
};
