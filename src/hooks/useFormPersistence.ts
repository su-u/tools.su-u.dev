import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

// フォームの情報をlocalStorageに保存して永続化する
export const useFormPersistence = <T>(
  featureName: string,
  methods: UseFormReturn<T>,
  setCallback: (localValues: T) => void,
) => {
  const name = `devtools.formData.${featureName}`;
  const {
    watch,
    formState: { isDirty },
  } = methods;
  const formData = watch();
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    try {
      const localValues = JSON.parse(localStorage.getItem(name));
      if (!isDirty && isDefault) {
        setCallback(localValues);
        // console.log('get', { name, defaultValues });
        setIsDefault(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDirty, isDefault]);

  useEffect(() => {
    // console.log('set1', { name, isDirty, isDefault, formData });
    if (isDirty || (!isDirty && !isDefault)) {
      localStorage.setItem(name, JSON.stringify(formData));
      // console.log('set2', { name, isDirty, isDefault, formData });
    }
  }, [formData, isDirty, isDefault]);
};
