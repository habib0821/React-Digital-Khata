'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [name, setname] = useState("")
  const [title, settitle] = useState("")
  const [amount, setamount] = useState("")
  const [mainRecord, setmainRecord] = useState([])
  const [totalAmount, settotalAmount] = useState(0)

  // SUBMIT
  let submitHandler = (e) => {
    e.preventDefault();
    const newRecord = { name, title, amount: parseFloat(amount) };
    setmainRecord([...mainRecord, newRecord]);
    setname("");
    settitle("");
    setamount("");
    console.log(mainRecord)
  }

  // DELETE 
  let deleteHandler = (i) => {
    let copyRecord = [...mainRecord];
    copyRecord.splice(i, 1)
    setmainRecord(copyRecord);
  }

  // RENDER 
  let renderRecord = <h2>No Record Available</h2>
  if (mainRecord.length > 0) {
    renderRecord = mainRecord.map((t, i) => {
      return (
        <li key={i} className='w-full flex justify-center items-center gap-28 bg-orange-100 rounded-2xl px-6 py-4'>
          <h2>{i + 1}</h2>
          <h2>{t.name}</h2>
          <h2>{t.title}</h2>
          <h2 className='amount'>{t.amount}</h2>
          <button className='bg-green-600 px-3 py-1 rounded-lg' onClick={() => {
            deleteHandler(i)
          }} >Paid</button>
        </li>
      )
    })
  }

  // TOTAL AMOUNT
useEffect(()=>{
  let balance = mainRecord.reduce((acc, record)=> acc + record.amount, 0)
  settotalAmount(balance);
}, [mainRecord]);




  return (
    <>
      <nav className='bg-orange-600 w-full h-20 flex items-center justify-center'>
        <h1 className='text-3xl text-white font-bold'>Al-Habib Digi Khata</h1>
      </nav>
      <form onSubmit={submitHandler} className='mt-6 gap-5 flex flex-col justify-center items-center'>
        <input className='px-16 py-4 rounded-lg text-2xl' type='text' placeholder='Enter the name' value={name} onChange={(e) => {
          setname(e.target.value)
        }} />
        <input className='px-16 py-4 rounded-lg text-2xl' type='text' placeholder='Enter the title' value={title} onChange={(e) => {
          settitle(e.target.value)
        }} />
        <input className='px-16 py-4 rounded-lg text-2xl' type='number' placeholder='Enter amount' value={amount} onChange={(e) => {
          setamount(e.target.value)
        }} />

        <button className='px-12 py-2 bg-blue-600 text-white text-xl rounded-lg font-bold'>Add</button>
        
      </form>

      <hr className='bg-gray-500 h-1 mt-10' />

      <div className='recordList w-full flex justify-center items-center'>
        <div className='mt-8 mb-6 records w-1/2 flex-col flex justify-center items-center'>
          <h4 className='balance text-2xl font-bold'>You'll get {totalAmount}</h4>
          <br/>
          <ul className='flex flex-col gap-4 text-2xl font-bold justify-center items-center text-center'>{renderRecord}</ul>
        </div>
      </div>


    </>
  )
}

export default page
