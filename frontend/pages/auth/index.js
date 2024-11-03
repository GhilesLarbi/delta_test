import React, { useState} from "react";
import { useRouter } from 'next/router';
import restApi from "../../api/endpoints";


const setAuthData = (token, user) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error setting auth data:', error);
    return false;
  }
};

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await restApi.login(formData);
      
      if (!result.ok) {
        setApiError(result.data?.message || "Une erreur est survenue");
        return;
      }

      // Store auth data in localStorage
      const storageResult = setAuthData(result.data.token, result.data.user);
      if (!storageResult) {
        setApiError("Erreur lors de la création de la session");
        return;
      }

      router.push('/home');
    } catch (error) {
      setApiError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (apiError) setApiError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Votre mot de passe"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Connexion...' : 'Connexion'}
      </button>
    </form>
  );
};


const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    
    if (!formData.username) {
      newErrors.username = "Nom d'utilisateur requis";
    }
    
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "6 caractères minimum";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await restApi.register(formData);
      
      if (!result.ok) {
        setApiError(result.data?.message || "Une erreur est survenue");
        return;
      }

      // Optionally store auth data if your API returns them after registration
      if (result.data.token && result.data.user) {
        setAuthData(result.data.token, result.data.user);
        router.push('/home');
      } else {
        // If not auto-logging in after registration
        router.push('/auth?tab=login');
      }
    } catch (error) {
      setApiError("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (apiError) setApiError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-gray-700">Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Votre nom d'utilisateur"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.username && (
          <div className="text-red-500 text-sm mt-1">{errors.username}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Votre mot de passe"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Inscription...' : 'Inscription'}
      </button>
    </form>
  );
};

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`w-1/2 p-2 text-center font-bold border-b-2 ${
              activeTab === "login"
                ? "border-violet-500 text-violet-500"
                : "border-gray-300 text-gray-500"
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`w-1/2 p-2 text-center font-bold border-b-2 ${
              activeTab === "register"
                ? "border-violet-500 text-violet-500"
                : "border-gray-300 text-gray-500"
            }`}
          >
            Inscription
          </button>
        </div>

        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}