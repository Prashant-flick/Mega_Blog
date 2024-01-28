/* eslint-disable react/prop-types */
import React, {useId} from 'react'

// giving some kind of error below -->

// function Select({
//   options,
//   label,
//   className="",
//   ...props
// }, ref) {

//   const id = useId()
//   return (
//     <div className='w-full'>
//       {label && <label htmlFor='id' className=''></label>}
//       <select
//         {...props}
//         ref={ref}
//         id={id}
//         className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
//         focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//       >
//         {options?.map((options)   => (
//           <option key={options} value={options}>
//             {options}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// export default React.forwardRef(Select)

const Select = React.forwardRef(function Select({
  options,
  label,
  className="",
  ...props
}, ref) {

  const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor='id' className=''></label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
        focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((options)   => (
          <option key={options} value={options}>
            {options}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select