"use client"

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import Map from '../Map'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

function RentModal() {
  const rentModal=useRentModal()
  const [isLoading,setIsLoading]=useState(false)
  const router=useRouter()

  const [step,setStep]=useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors
    },
    reset
  }=useForm<FieldValues>({
    defaultValues:{
      category:'',
      location:null,
      guestCount:1,
      roomCount:1,
      bathroomCount:1,
      imageSrc:'',
      price:1,
      title:'',
      description:''
    }
  })

  const category=watch('category')
  const location=watch('location')
  const guestCount=watch('guestCount')
  const roomCount=watch('roomCount')
  const bathroomCount=watch('bathroomCount')
  const imageSrc=watch('imageSrc')


  const Map=useMemo(()=> dynamic(() => import("../Map"),{
    ssr:false
  }),[location])

  const setCustomValue=(id: string, value:any)=>{
    setValue(id,value,{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
  }

  const onBack = () => {
    setStep((value)=> value - 1)
  }

  const onNext= () => {
    setStep((value)=>value + 1)
  }

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    if(step!==STEPS.PRICE){
      return onNext()
    }

    setIsLoading(true)
    axios.post("/api/listings",data)
    .then(()=>{
      toast.success("Listing created!")
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    })
    .catch(()=>{
      toast.error("Something went wrong!")
    })
    .finally(()=>{
      setIsLoading(false)
    })

  }

  const actionLabel = useMemo(()=>{
    if(step === STEPS.PRICE){
        return "Create"
    }

    return "Next"
  },[step])

  const secondaryActionLabel = useMemo(()=>{
    if(step === STEPS.CATEGORY){
        return undefined
    }

    return "Back"
  },[step])

  let bodyContent=(
    <div className='flex flex-col gap-8'>
        <Heading title="Which of this best describes your place?" subtitle="Pick a category"/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item)=>(
                <div key={item.label} className='col-span-1'>
                    <CategoryInput selected={category===item.label} onClick={(category)=>setCustomValue("category",category)} 
                    label={item.label} icon={item.icon}/>
                </div>
            ))}
        </div>
    </div>
  )

  if(STEPS.LOCATION===step){
    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='Where is your place located?' subtitle='Help guests find you!'/>
        <CountrySelect onChange={(value) => setCustomValue("location",value)} value={location}/>
        <Map center={location?.latlng}/>
      </div>
    )
  }

  if(STEPS.INFO===step){
    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='Share some basics about your place' subtitle='What amenities do you have?'/>
        <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount}
        onChange={(value)=>setCustomValue("guestCount",value)}/>
        <hr/>
          <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount}
        onChange={(value)=>setCustomValue("roomCount",value)}/>
        <hr/>
          <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount}
        onChange={(value)=>setCustomValue("bathroomCount",value)}/>
      </div>
    )
  }

  if(STEPS.IMAGES===step){
    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='Add a photo of your place' subtitle='Show guests What your place looks like!'/>
        <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue("imageSrc",value)}/>
      </div>
    )
  }


  if(STEPS.DESCRIPTION===step){
    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='How would you describe you place?' subtitle='Short and sweet works best!'/>
        <Input id="title" label="Title" disabled={isLoading} errors={errors} required register={register}/>
        <hr/>
        <Input id="description" label="Description" disabled={isLoading} errors={errors} required register={register}/>
      </div>
    )
  }

  if(STEPS.PRICE===step){
    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='Now, set your price' subtitle='Hoiw much do you charge per night?'/>
        <Input id="price" label='Price' formatPrice register={register} disabled={isLoading} required
        type="number" errors={errors} />
      </div>
    )
  }

  return (
    <Modal title="Airbnb your home!" onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} 
    actionLabel={actionLabel} isOpen={rentModal.isOpen} secondaryLabel={secondaryActionLabel}
    secondaryAction={step===STEPS.CATEGORY ? undefined : onBack} body={bodyContent}
    />
  )
}

export default RentModal
