import { useState } from "react";
import "./App.css";
import { useForm } from 'react-hook-form';

export default function App() {
  const [values, setValues] = useState({
    email: '', password: '', confirmPassword: '', isRead: false,
  });
  // const [errors, setErrors] = useState([]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  /// add function when value change
  const handleChange = (event) => {
    event.persist();

    if (event.target.name === 'isRead') {
      setValues({
        ...values,
        [event.target.name]: !values.isRead,
      });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }

  };


  console.log('errors', errors);


  const stringJson = JSON.stringify(values);
  return (
    <div className="container">
      <h1>Đăng ký</h1>
      {/* {errors.map((error) => (
        <p key={error}>Error: {error}</p>
      ))} */}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <p>nhập email:</p>
        <input
          {...register('email', {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors?.email && <div> {errors?.email?.message}</div>}
        <p>nhập password:</p>
        <input
          {...register('password', {
            required: "Required",
            min: {
              value: 3,
              message: 'min length is 3'
            },
            max: {
              value: 20,
              message: 'max length is 20'
            },
          })}
          type="password"
        />
        {errors?.password && <div> {errors?.password?.message}</div>}
        <p>nhập lại password:</p>
        <input
          {...register('confirmPassword', {
            required: "Required",
            min: {
              value: 3,
              message: 'min length is 3'
            },
            max: {
              value: 20,
              message: 'max length is 20'
            },
            validate: (val) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            },
          })}
          type="password"
        />
        {errors?.confirmPassword && <div> {errors?.confirmPassword?.message}</div>}
        <br />
        <br />
        <label>
          <input
            {...register('isRead', {
              required: "Required",
            })}
            type="checkbox"
          />I read and accept the privacy policy:
        </label>

        <p>bấm submit form</p>
        <button>submit nè</button>
      </form >
      <div className="show-json-string-setValues">{stringJson}</div>
    </div >
  );
}