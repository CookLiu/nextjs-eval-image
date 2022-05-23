import React from 'react'
import { Field, reduxForm } from 'redux-form'

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>VIN码画框是否成功</label>
        <div>
          <label>
            <Field name="vin_check" component="input" type="radio" value="成功" />{' '}
            成功
          </label>
          <label>
            <Field name="vin_check" component="input" type="radio" value="失败" />{' '}
            失败
          </label>
        </div>
      </div>
      <div>
        <label>VIN码OCR是否成功</label>
        <div>
          <label>
            <Field name="vin_ocr" component="input" type="radio" value="成功" />{' '}
            成功
          </label>
          <label>
            <Field name="vin_ocr" component="input" type="radio" value="失败" />{' '}
            失败
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="is_car_vin">是否接车场景：车窗下VIN照片</label>
        <div>
          <Field
            name="is_car_vin"
            id="is_car_vin"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>备注</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          提交
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          清除结果
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(SimpleForm)