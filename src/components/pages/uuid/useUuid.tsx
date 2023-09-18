import React, { useState, useCallback } from 'react';
import { useToaster, Message } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { generateUUIDs } from '@/components/pages/uuid/uuidLib';

type UuidForm = {
  version: number;
  generateCount: number;
  isUppercase: boolean;
  isHyphen: boolean;
  UUIDName: string;
  UUIDNamespace: string;
};

const DEFAULT_VALUES = {
  version: 4,
  isUppercase: false,
  isHyphen: true,
  generateCount: 1,
  UUIDName: '',
  UUIDNamespace: '',
};

const selectData: ItemDataType<number>[] = [
  {
    label: 'Version 1',
    value: 1,
  },
  {
    label: 'Version 3',
    value: 3,
  },
  {
    label: 'Version 4',
    value: 4,
  },
  {
    label: 'Version 5',
    value: 5,
  },
];

export const useUuid = () => {
  const toaster = useToaster();
  const [output, setOutput] = useState('');
  const methods = useCustomForm<UuidForm>({
    defaultValues: {
      version: DEFAULT_VALUES.version,
      isUppercase: DEFAULT_VALUES.isUppercase,
      isHyphen: DEFAULT_VALUES.isHyphen,
      generateCount: DEFAULT_VALUES.generateCount,
      UUIDName: DEFAULT_VALUES.UUIDName,
      UUIDNamespace: DEFAULT_VALUES.UUIDNamespace,
    },
  });
  const { control, watch } = methods;

  const { version, isUppercase, isHyphen, generateCount, UUIDName, UUIDNamespace } = watch();

  const onClickGenerateUUID = React.useCallback(() => {
    try {
      const uuids = generateUUIDs(version, generateCount, {
        isUppercase,
        isHyphen,
        name: UUIDName,
        namespace: UUIDNamespace,
      }).join('\n');
      setOutput(uuids);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toaster.push(
          <Message showIcon type="error">
            {e.message}
          </Message>,
          {
            placement: 'topEnd',
          },
        );
        return;
      }
      console.error(e);
    }
  }, [version, isUppercase, isHyphen, generateCount, UUIDName, UUIDNamespace]);

  const onClickClear = useCallback(() => {
    setOutput('');
  }, [setOutput]);

  return {
    methods,
    control,
    selectData,
    onClickGenerateUUID,
    output,
    DEFAULT_VALUES,
    version,
    onClickClear,
  };
};
