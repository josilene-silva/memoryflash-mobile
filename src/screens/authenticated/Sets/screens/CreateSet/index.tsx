/* eslint-disable react/no-unstable-nested-components */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';
import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Form/Button';
import { DropdownForm } from 'src/components/Form/DropdownForm';

import { ErrorType, getError } from 'src/utils/error';

import { api } from 'src/services/api';

import { Container, Fields, Form, Scroll } from './styles';

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
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    categoryId: Yup.string().required('Categoria é obrigatória'),
    description: Yup.string().required('Descrição é obrigatória'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
      setLoadingRequest(true);
      await api.post('/sets', payload);

      setModalResponseData({
        type: 'success',
        message: 'Conjunto cadastrado',
        isVisible: true,
      });

      reset();
    } catch (err) {
      const error = getError(err as ErrorType);

      setModalResponseData({
        type: error.type,
        message: error.message,
        isVisible: true,
      });
    }
    setLoadingRequest(false);
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
    } catch (err) {
      const error = getError(err as ErrorType);

      setModalResponseData({
        type: error.type,
        message: error.message,
        isVisible: true,
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Scroll>
        <LoaderRequest visible={loadingRequest} />
        <Modal
          type={modalResponseData.type}
          message={modalResponseData.message}
          visible={modalResponseData.isVisible}
          onPress={() =>
            setModalResponseData(old => ({ ...old, isVisible: false }))
          }
        />
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
