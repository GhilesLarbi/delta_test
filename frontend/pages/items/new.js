import Layout from "../../components/Layout/Layout";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { usePouchDB } from "../../hooks/usePouchDB";

const ItemSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(['goods', 'services'], 'Please select a valid type')
    .required('Type is required'),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  body: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .required('Description is required'),
  likes: Yup.number()
    .min(0, 'Likes cannot be negative')
    .required('Likes is required'),
});

function NewItemPage() {
  const { createPost, isOnline } = usePouchDB();

  const initialValues = {
    type: '',
    title: '',
    body: '',
    likes: 0,
  };

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      await createPost(values);
      setStatus({ success: true });
      resetForm();
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Item</h1>
          
          {!isOnline && (
            <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-3 rounded">
              You're offline. Your changes will sync when you're back online.
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={ItemSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, status }) => (
              <Form className="bg-white shadow-md rounded-lg p-8">
                {status?.success && (
                  <div className="mb-6 flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Item created successfully!</span>
                  </div>
                )}

                {status?.error && (
                  <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded">
                    <AlertCircle className="h-5 w-5" />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Type *
                  </label>
                  <Field
                    as="select"
                    name="type"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      errors.type && touched.type
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a type</option>
                    <option value="goods">Goods</option>
                    <option value="services">Services</option>
                  </Field>
                  {errors.type && touched.type && (
                    <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Title *
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      errors.title && touched.title
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.title && touched.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Description *
                  </label>
                  <Field
                    as="textarea"
                    name="body"
                    placeholder="Enter description"
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      errors.body && touched.body
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.body && touched.body && (
                    <p className="mt-1 text-sm text-red-500">{errors.body}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Likes *
                  </label>
                  <Field
                    type="number"
                    name="likes"
                    placeholder="Enter number of likes"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      errors.likes && touched.likes
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.likes && touched.likes && (
                    <p className="mt-1 text-sm text-red-500">{errors.likes}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Item'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default NewItemPage;