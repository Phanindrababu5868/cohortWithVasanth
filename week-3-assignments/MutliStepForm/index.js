import React, { useReducer } from "react";

const initialState = {
  currentStep: 0,

  formData: {
    name: "",
    email: "",
    username: "",
    password: "",
    city: "",
    pincode: ""
  },

  errors: {},
  isSubmitted: false
};

const validateStep = (step, data) => {
  const errors = {};

  if (step === 0) {
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }
  }

  if (step === 1) {
    if (!data.username.trim()) {
      errors.username = "Username is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Minimum 8 characters required";
    }
  }

  if (step === 2) {
    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!/^\d{6}$/.test(data.pincode)) {
      errors.pincode = "Enter a valid 6-digit pincode";
    }
  }

  return errors;
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { name, value } = action.payload;

      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value
        },
        errors: {
          ...state.errors,
          [name]: ""
        }
      };
    }

    case "NEXT_STEP": {
      const errors = validateStep(
        state.currentStep,
        state.formData
      );

      if (Object.keys(errors).length) {
        return { ...state, errors };
      }

      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 2),
        errors: {}
      };
    }

    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        errors: {}
      };

    case "SUBMIT_FORM": {
      const errors = {
        ...validateStep(0, state.formData),
        ...validateStep(1, state.formData),
        ...validateStep(2, state.formData)
      };

      if (Object.keys(errors).length) {
        const firstInvalidStep = [0, 1, 2].find(
          (step) =>
            Object.keys(validateStep(step, state.formData)).length > 0
        );

        return {
          ...state,
          currentStep: firstInvalidStep,
          errors,
          isSubmitted: false
        };
      }

      return {
        ...state,
        errors: {},
        isSubmitted: true
      };
    }

    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const { currentStep, formData, errors, isSubmitted } = state;

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
      />

      {errors[name] && (
        <p className="error">{errors[name]}</p>
      )}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="success">
        <h2>Registration Successful!</h2>
        <p>Your form has been submitted.</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="multi-step-form">
      <h2>Registration Form</h2>

      <div className="progress">
        Step {currentStep + 1} of 3
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <div>
            <h3>Step 1: Personal Details</h3>

            {renderInput("name", "Full Name")}
            {renderInput("email", "Email", "email")}
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h3>Step 2: Account Details</h3>

            {renderInput("username", "Username")}
            {renderInput("password", "Password", "password")}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3>Step 3: Address Details</h3>

            {renderInput("city", "City")}
            {renderInput("pincode", "Pincode")}
          </div>
        )}

        <div className="actions">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}

          {currentStep < 2 ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;