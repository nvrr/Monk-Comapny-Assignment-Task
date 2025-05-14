import { useState } from 'react';

function useInput(initialValue, type = 'text') {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    if (type === 'checkbox') {
      setValue(event.target.checked); // Handle checkbox
    } else {
      setValue(event.target.value); // Handle text inputs
    }
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    reset
  };
}



function MyForm() {
  const name = useInput('');
  const email = useInput('');
  const subscribe = useInput(false, 'checkbox');  // Handling checkbox input

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name.value);
    console.log("Email:", email.value);
    console.log("Subscribed:", subscribe.value);
    name.reset();
    email.reset();
    subscribe.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name.value}
          onChange={name.onChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email.value}
          onChange={email.onChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={subscribe.value}
            onChange={subscribe.onChange}
          />
          Subscribe to Newsletter
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
