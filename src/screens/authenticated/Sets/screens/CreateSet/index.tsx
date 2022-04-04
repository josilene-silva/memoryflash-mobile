/* eslint-disable react/no-unstable-nested-components */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { InputForm } from '../../../../../components/Form/InputForm';
import { Container, Fields, Form, Scroll } from './styles';
import { api } from '../../../../../services/api';
import { Button } from '../../../../../components/Form/Button';
import { DropdownForm } from '../../../../../components/Form/DropdownForm';

type Inputs = {
  name?: string;
  categoryId?: number;
  description?: string;
};

export interface CategoriesListProps {
  id: string;
  name: string;
}

export function CreateSet() {
  const [categories, setCategories] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    categoryId: Yup.string().required('Categoria é obrigatória'),
    description: Yup.string().required('Descrição é obrigatória'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  async function handleCreateSet({ name, categoryId, description }: Inputs) {
    const payload = {
      name,
      categoryId,
      description,
    };
    try {
      await api.post('/sets', payload);
      Alert.alert(`Success`, `Conjunto cadastrado`);
    } catch (err) {
      Alert.alert('Error', `${err.response.data.message}`);
    }
  }

  async function loadCategories() {
    try {
      const { data } = await api.get('/categories');
      const categoriesFormatted = data.map(category => {
        return {
          label: category.name,
          value: category.id,
          inputLabel: category.name,
        };
      });

      setCategories(categoriesFormatted);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Scroll>
        <Container>
          <Form>
            <Fields>
              <DropdownForm
                items={categories}
                placeholder={{
                  label: 'Selecione uma categoria',
                  value: '',
                  inputLabel: 'Selecione uma categoria',
                }}
                name="categoryId"
                control={control}
                error={errors.categoryId && errors.categoryId.message}
              />

              <InputForm
                placeholder="Nome"
                name="name"
                control={control}
                error={errors.name && errors.name.message}
                returnKeyType="next"
              />

              <InputForm
                placeholder="Descrição"
                numberOfLines={2}
                multiline
                name="description"
                control={control}
                error={errors.description && errors.description.message}
                returnKeyType="next"
              />
            </Fields>
            <Button title="Salvar" onPress={handleSubmit(handleCreateSet)} />
          </Form>
        </Container>
      </Scroll>
    </TouchableWithoutFeedback>
  );
}
