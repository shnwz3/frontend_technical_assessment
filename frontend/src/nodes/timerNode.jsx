// timerNode.jsx - Timer/Delay Node

import { useState } from 'react';
import { Timer } from 'lucide-react';
import { BaseNode } from '../components/BaseNode.jsx';
import { NumberField, SelectField } from '../components/NodeFields.jsx';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon={Timer}
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'output' }]}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <NumberField
          label="Delay"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          min={0}
          step={100}
        />
        <SelectField
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          options={[
            { value: 'ms', label: 'ms' },
            { value: 's', label: 'sec' },
            { value: 'm', label: 'min' }
          ]}
        />
      </div>
      <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '11px' }}>
        Delays execution by specified time
      </p>
    </BaseNode>
  );
};
