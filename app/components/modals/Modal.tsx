"use client"
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button'

interface ModalProps{
    isOpen?:boolean,
    onClose:()=>void
    onSubmit:()=>void
    title?:string
    actionLabel:string
    body?:ReactElement
    footer?:ReactElement
    disabled?:boolean
    secondaryAction?:()=>void
    secondaryLabel?:string
}

function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    actionLabel,
    body,
    footer,
    disabled,
    secondaryAction,
    secondaryLabel
}:ModalProps) {
  const[showModal,setShowModal]=useState(isOpen)

  useEffect(()=>{
    setShowModal(isOpen)
  },[isOpen])

  const handleClose=useCallback(()=>{
    if(disabled){
        return
    }

    setShowModal(false);
    setTimeout(()=>{
        onClose()
    },300)  

  },[disabled,onClose])

  const handleSubmit=useCallback(()=>{
    if(disabled){
        return
    }

    onSubmit()
  },[disabled,onSubmit])

  const handleSecondaryAction=useCallback(()=>{
    if(disabled || !secondaryAction){
        return;
    }

    secondaryAction();
  },[disabled,secondaryAction])


  if(!isOpen){
    return null;
  }

  return (
    <>
    <div className='flex overflow-x-hidden justify-center items-center overflow-y-auto 
    outline-none focus:outline-none fixed bg-neutral-800/70 inset-0 z-50'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
          {/* Content */}
          <div className={`translate duration-300
            ${showModal?'translate-y-0':'translate-y-full'}
            ${showModal?'opacity-100':'translate-y-full'}`}>
              <div className='translate border-0 h-full lg:h-auto md:h-auto rounded-lg flex flex-col shadow-lg relative
              w-full bg-white outline-none focus:outline-none'>
                {/* Header */}
                <div className='flex items-center rounded-t p-6 border-b-[1px] relative justify-center'>
                  <button onClick={handleClose} className='border-0 p-1 absolute hover:opacity-70 transition left-9'>
                    <IoMdClose size={18}/>
                  </button>
                  <div className='text-lg font-semibold'>
                    {title}
                  </div>
                </div>
                {/* Body */}
                <div className='relative p-6 flex-auto'>
                  {body}
                </div>
                {/* Footer */}
                <div className='p-6 flex flex-col gap-2'>
                  <div className='flex flex-row items-center gap-4 w-full'>
                   {secondaryLabel && secondaryAction && ( <Button label={secondaryLabel} onClick={handleSecondaryAction} disabled={disabled}/>)}
                    <Button label={actionLabel} onClick={handleSubmit} disabled={disabled}/>
                  </div>
                  {footer}
                </div>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Modal
