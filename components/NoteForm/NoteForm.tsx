'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NewNote } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title too short!')
    .max(50, 'Title too long!')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content too long!'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: NewNote) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting || mutation.isPending}
            >
              Save Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
