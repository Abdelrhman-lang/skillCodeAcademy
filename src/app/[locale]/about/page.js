import Image from 'next/image'
import { Card, CardContent } from '../../../components/ui/card'
import { getLocale } from '../../../lib/locale'
import { getDictionary } from '../../../lib/transilation'
import React from 'react'
import Link from 'next/link'
import SectionHeader from '../../../components/section-header/SectionHeader'

export default async function AboutPage() {
  const locale = await getLocale()
  const {about} = await getDictionary(locale)
  return (
  <section className='container py-15'>
    <div className="mx-auto max-w-screen-2xl  px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-screen">
          <div className=" p-8 md:p-12 lg:px-16 lg:py-24 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold  md:text-3xl capitalize">
                 {about.title}
              </h2>

              <p className="hidden text-gray-500  sm:mt-4 sm:block">
                {about.description}
              </p>

              <div className="mt-4 md:mt-8">
                <Link
                   href={`/${locale}/explore`}
                  className="inline-block rounded-sm border border-balck-100 bg-primary px-12 py-3 text-sm font-medium transition hover:bg-transparent hover:text-primary focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  {about.btn}
                </Link>
              </div>
            </div>
          </div>
      
        <div className="grid grid-cols-2 gap-4   pb-10">
          <Image
            alt="about-img"
            src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
              className="h-40 w-full object-cover sm:h-56 md:h-full rounded-lg"
              width={650}
              height={160}
          />

          <Image
            alt="about-img"
            src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="h-40 w-full object-cover sm:h-56 md:h-full mt-10 rounded-lg"
              width={650}
              height={160}
          />
        </div>
        </div>
        
      </div>

      <div className='mt-20'>
        <div className='text-center mb-15'>
         <SectionHeader title={about.ourFeatures}/>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="pt-0 text-center">
            <img src={"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYW18ZW58MHx8MHx8fDA%3D"} alt='about-img'  className='h-full w-full object-cover rounded-lg rounded-b-none'/>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{about.card__1.title}</h3>
              <p className="text-sm text-muted-foreground">
                {about.card__1.description}
              </p>
            </CardContent>
          </Card>

          <Card className="pt-0 text-center">
            <img src={"https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D"} alt='about-img'  className='h-full w-full object-cover rounded-lg rounded-b-none'/>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{ about.card__2.title}</h3>
              <p className="text-sm text-muted-foreground">
                {about.card__2.description}
              </p>
            </CardContent>
          </Card>

          <Card className="pt-0 text-center">
          <img src={"https://images.unsplash.com/photo-1561489422-45de3d015e3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D"} alt='about-img'  className='h-full w-full object-cover rounded-lg rounded-b-none'/>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{about.card__3.title }</h3>
              <p className="text-sm text-muted-foreground">
                {about.card__3.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
</section>
  );
}
