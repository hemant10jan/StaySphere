"use client"

import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from "../inputs/Input"
import toast from 'react-hot-toast'
import Button from '../Button'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginModal() {
  const router=useRouter()
  const registerModal=useRegisterModal()
  const loginModal=useLoginModal()

  const [loading,setLoading]=useState(false)

  const {
    register,
    handleSubmit,
    formState:{ errors },
  }=useForm<FieldValues>({
    defaultValues:{
        email:"",
        password:""
    }
  });

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    setLoading(true)

    signIn("credentials",{
        ...data,
        redirect:false
    })
    .then((callback)=>{
        setLoading(false)

        if(callback?.ok){
            toast.success("Logged in")
            router.refresh()
            loginModal.onClose();
        }

        if(callback?.error){
          toast.error(callback.error)
        }
    })
  }

  const toggle=useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal,registerModal])

  const bodyContent=(
    <div className='flex flex-col gap-4'>
        <Heading title='Welcome back' subtitle='Login to your account.' center/>
        <Input id="email" required disabled={loading} label='Email' register={register} errors={errors}/>
        <Input id="password" type='password' required disabled={loading} label='Password' register={register} errors={errors}/>
    </div>
  )

  const footerContent=(
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button label='Continue with Google' icon={FcGoogle} onClick={()=>signIn("google")} outline/>
      <Button label='Continue with Github' icon={AiFillGithub} onClick={()=>signIn("github")} outline/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>First time using Airbnb?</div>
          <div onClick={()=>toggle()} className='text-neutral-800 cursor-pointer hover:underline'>
            Sign up
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal disabled={loading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue'
    onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
  )
}

export default LoginModal
