'use client'
import React, { useState, useTransition } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

interface Inputs {
  name: string
  lastName: string
  email: string
  country: string
  phone: string
  linkedin: string
  affiliation: string
  grade: string
  authorPaper: boolean
  certificate: boolean
}

const country = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'AndorrA', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Bouvet Island', code: 'BV' },
  { name: 'Brazil', code: 'BR' },
  { name: 'British Indian Ocean Territory', code: 'IO' },
  { name: 'Brunei Darussalam', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Cape Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' },
  { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Christmas Island', code: 'CX' },
  { name: 'Cocos (Keeling) Islands', code: 'CC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Congo', code: 'CG' },
  { name: 'Congo, The Democratic Republic of the', code: 'CD' },
  { name: 'Cook Islands', code: 'CK' },
  { name: 'Costa Rica', code: 'CR' },
  { name: "Cote D'Ivoire", code: 'CI' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'French Southern Territories', code: 'TF' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
  { name: 'Holy See (Vatican City State)', code: 'VA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran, Islamic Republic Of', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: "Korea, Democratic People'S Republic of", code: 'KP' },
  { name: 'Korea, Republic of', code: 'KR' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: "Lao People'S Democratic Republic", code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Macao', code: 'MO' },
  { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia, Federated States of', code: 'FM' },
  { name: 'Moldova, Republic of', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Netherlands Antilles', code: 'AN' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Palestinian Territory, Occupied', code: 'PS' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Pitcairn', code: 'PN' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Reunion', code: 'RE' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'RWANDA', code: 'RW' },
  { name: 'Saint Helena', code: 'SH' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Pierre and Miquelon', code: 'PM' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Sao Tome and Principe', code: 'ST' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia and Montenegro', code: 'CS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  { name: 'Swaziland', code: 'SZ' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syrian Arab Republic', code: 'SY' },
  { name: 'Taiwan, Province of China', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania, United Republic of', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tokelau', code: 'TK' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Turks and Caicos Islands', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'United States Minor Outlying Islands', code: 'UM' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Viet Nam', code: 'VN' },
  { name: 'Virgin Islands, British', code: 'VG' },
  { name: 'Virgin Islands, U.S.', code: 'VI' },
  { name: 'Wallis and Futuna', code: 'WF' },
  { name: 'Western Sahara', code: 'EH' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' },
]

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [submitForm, setSubmitForm] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setSubmitForm(true)
    const fetching = await fetch('https://simbig24-api.onrender.com/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const response = await fetching.json()

    if (response.success) {
      alert('registro correcto')
      location.reload()
    }
    setSubmitForm(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      <h3 className="text-2xl text-primary font-semibold">
        Personal Information
      </h3>
      <div className="flex gap-4 flex-wrap py-4">
        <div className="flex flex-1 min-w-[312px] flex-col">
          <label htmlFor="#name" className=" text-base font-medium">
            Name <span className="text-lg text-red-500">*</span>
          </label>
          <input
            autoComplete="off"
            id="#name"
            className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
            type="text"
            placeholder="Your name"
            {...register('name', {
              required: true,
              minLength: 2,
              maxLength: 60,
            })}
          />
          {!!errors.name && (
            <span className="bg-yellow-300 px-6 py-2 mt-1">
              <ul className="list-disc text-yellow-900 text-sm">
                <li>Solo debe contener letras.</li>
                <li>Minimo 2 caracteres.</li>
                <li>Maximo 50 caracteres.</li>
              </ul>
            </span>
          )}
        </div>
        <div className="flex flex-1 min-w-[312px] flex-col">
          <label htmlFor="#lastname" className=" text-base font-medium">
            LastName<span className="text-lg text-red-500">*</span>
          </label>
          <input
            id="#lastname"
            autoComplete="off"
            className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
            type="text"
            placeholder="Your last name"
            {...register('lastName', {
              required: true,
              minLength: 2,
              maxLength: 60,
            })}
          />
          {!!errors.lastName && (
            <span className="bg-yellow-300 px-6 py-2 mt-1">
              <ul className="list-disc text-yellow-900 text-sm">
                <li>Solo debe contener letras.</li>
                <li>Minimo 2 caracteres.</li>
                <li>Maximo 50 caracteres.</li>
              </ul>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#email" className=" text-base font-medium">
          Email<span className="text-lg text-red-500">*</span>
        </label>
        <input
          id="#email"
          className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
          type="text"
          autoComplete="off"
          placeholder="Your email"
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        {!!errors.email && (
          <span className="bg-yellow-300 px-6 py-2 mt-1">
            <ul className="list-disc text-yellow-900 text-sm">
              <li>Debe contener un formato tipo "email".</li>
            </ul>
          </span>
        )}
      </div>
      <div className="flex gap-4 flex-wrap py-4">
        <div className="flex flex-1 min-w-[312px] flex-col">
          <label htmlFor="#country" className=" text-base font-medium">
            Country
          </label>
          <select
            id="country"
            autoComplete="off"
            className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
            {...register('country')}
          >
            <option disabled selected value={''}>
              Select option...
            </option>
            {country.map(item => (
              <option value={item.name} key={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 min-w-[312px] flex-col">
          <label htmlFor="#phone" className=" text-base font-medium">
            Phone
          </label>
          <input
            id="#phone"
            autoComplete="off"
            className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
            type="text"
            placeholder="Your phone"
            {...register('phone', {
              minLength: 2,
              pattern:
                /^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
            })}
          />
          {!!errors.phone && (
            <span className="bg-yellow-300 px-6 py-2 mt-1">
              <ul className="list-disc text-yellow-900 text-sm">
                <li>Formatos validos:</li>
                <li>+1 234 567 8900</li>
                <li>(123) 456-7890</li>
                <li>123-456-7890</li>
                <li>123.456.7890</li>
                <li>1234567890</li>
              </ul>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#linkein" className=" text-base font-medium">
          LinkedIn
        </label>
        <input
          id="#linkein"
          className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
          autoComplete="off"
          type="text"
          placeholder="Your linkedIn"
          {...register('linkedin')}
        />
      </div>
      <h3 className="text-2xl text-primary font-semibold">
        Academic Information<span className="text-lg text-red-500">*</span>
      </h3>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#affiliation" className=" text-base font-medium">
          Affiliation/University<span className="text-lg text-red-500">*</span>
        </label>
        <input
          id="#affiliation"
          className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
          autoComplete="off"
          type="text"
          placeholder="Please enter your affiliation or the University where you study"
          {...register('affiliation', {
            required: true,
            minLength: 2,
          })}
        />
        {!!errors.affiliation && (
          <span className="bg-yellow-300 px-6 py-2 mt-1">
            <ul className="list-disc text-yellow-900 text-sm">
              <li>Solo debe contener letras.</li>
              <li>Minimo 2 caracteres.</li>
            </ul>
          </span>
        )}
      </div>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#grade" className=" text-base font-medium">
          Grade
        </label>
        <select
          id="grade"
          autoComplete="off"
          className="px-4 py-2 bg-primary/10 outline-none placeholder:text-primary/60 placeholder:font-medium w-full"
          {...register('grade')}
        >
          <option disabled selected value={''}>
            Select option...
          </option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
          <option value="Magister">Magister</option>
          <option value="PhD">PhD</option>
        </select>
      </div>
      <h3 className="text-2xl text-primary font-semibold">
        Participate Information
      </h3>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#affiliation" className=" text-base font-medium">
          Are you a paper author?<span className="text-lg text-red-500">*</span>
        </label>
        <div className="flex gap-8 mt-3">
          <label className="flex gap-2">
            <input
              autoComplete="off"
              type="radio"
              className="scale-125"
              {...register('authorPaper', {
                required: true,
              })}
              value={'yes'}
            />
            Yes
          </label>
          <label className="flex gap-2">
            <input
              autoComplete="off"
              type="radio"
              className="scale-125"
              {...register('authorPaper', {
                required: true,
              })}
              value={'no'}
            />
            No
          </label>
        </div>
        {!!errors.authorPaper && (
          <span className="bg-yellow-300 px-6 py-2 mt-1">
            <ul className="list-disc text-yellow-900 text-sm">
              <li>Opcion requerida.</li>
            </ul>
          </span>
        )}
      </div>
      <div className="flex flex-1 min-w-[312px] flex-col py-4">
        <label htmlFor="#certificate" className=" text-base font-medium">
          Do you want a Certificate?
          <span className="text-lg text-red-500">*</span>
          <p className="text-black/70 text-xs">
            Remember that this year the certification for SIMBig 2021 will have
            a cost
          </p>
        </label>
        <div className="flex gap-8 mt-3">
          <label className="flex gap-2">
            <input
              type="radio"
              autoComplete="off"
              className="scale-125"
              {...register('certificate', {
                required: true,
              })}
              value={'yes'}
            />
            Yes
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              autoComplete="off"
              className="scale-125"
              {...register('certificate', {
                required: true,
              })}
              value={'no'}
            />
            No
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              autoComplete="off"
              className="scale-125"
              {...register('certificate', {
                required: true,
              })}
              value={'maybe'}
            />
            Maybe (Let me decide later)
          </label>
        </div>
        {!!errors.certificate && (
          <span className="bg-yellow-300 px-6 py-2 mt-1">
            <ul className="list-disc text-yellow-900 text-sm">
              <li>Opcion requerida.</li>
            </ul>
          </span>
        )}
      </div>
      <hr className="my-8" />
      <div className="py-4">
        <label className="flex gap-8 items-start">
          <input type="checkbox" className="mt-2 scale-125" />
          <p>
            I declare that the data filled in are real and can be used by the
            organizers of the SIMBig 2021 Event. If you want more information
            visit our [LINK]
          </p>
        </label>
      </div>
      <div className="py-4">
        <label className="flex gap-8 items-start">
          <input type="checkbox" className="mt-2 scale-125" defaultChecked />
          <p>
            I want to receive information on employment, research and / or other
            related opportunities from SIMBig and its partners
          </p>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-primary w-[150px] text-white font-medium mt-4 flex justify-center items-center disabled:opacity-60"
          disabled={submitForm}
        >
          {submitForm ? (
            <div className="h-5 w-5 border-[3px] border-t-transparent border-l-white border-r-white border-b-white rounded-full animate-spin"></div>
          ) : (
            'Register'
          )}
        </button>
        {String(submitForm)}
      </div>
    </form>
  )
}

export default FormRegister
