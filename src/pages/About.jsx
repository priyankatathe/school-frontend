import React from 'react'
import Footer from './Footer'

const About = () => {
    return <>
        {/* <div className='mt-10 overflow-hidden'>
            <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">About Our School</h2>

            <div>
                <h6 className='m-5 text-center font-extrabold sm:text-lg'>** Starting year of school  | <strong>2015</strong> ** </h6>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 px-5 md:px-10'>
                <div className='text-justify text-sm sm:text-base leading-relaxed'>
                    <div>
                        <p className="text-gray-700 text-lg">
                            ABC Public School is a place where excellence in education and character building go hand-in-hand.
                            Established in 2001, we are committed to nurturing bright minds through academics, sports, and values.
                        </p>
                        <p className="mt-4 text-gray-700 text-lg">
                            Our mission is to provide a learning environment that encourages creativity, critical thinking,
                            and confidence to face future challenges.
                        </p>
                        <p className="text-gray-700 text-lg">
                            ABC Public School is a place where excellence in education and character building go hand-in-hand.
                            Established in 2001, we are committed to nurturing bright minds through academics, sports, and values.
                        </p>
                        <p className="mt-4 text-gray-700 text-lg">
                            Our mission is to provide a learning environment that encourages creativity, critical thinking,
                            and confidence to face future challenges.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center"'>
                    <div className="card card-compact rounded-2xl w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://viaaninternationalschool.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-13-at-22.06.07-1-480x800.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="text-2xl text-center"> ms. Sujata sing</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, consequatur.</p>

                        </div>
                    </div>
                </div>
            </div>

            <div className='my-10 p-5 text-center '>
                <h1 className='text-4xl font-bold text-blue-800 mb-6 text-center'>message</h1>
                <p className='text-sm sm:text-base leading-relaxed px-2 text-justify '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio qui delectus reiciendis facilis, voluptas iste? Repudian px-2dae, vero maiores possimus incidunt amet, vitae reprehenderit obcaecati dolorum eaque consequatur quibusdam voluptatibus mollitia suscipit sapiente, aliquam pariatur quo placeat maxime modi ducimus officia aliquid aspernatur doloremque? Quisquam sapiente reiciendis velit harum aliquid similique neque blanditiis aspernatur cum dolorem maiores, consectetur amet, officia debitis doloremque possimus itaque recusandae sint numquam autem libero eius animi commodi! Deserunt vel impedit ipsum, magnam dolorem obcaecati? Voluptate rem, repudiandae obcaecati ut nihil optio distinctio natus sed quis consectetur iste rerum nesciunt et autem officia aspernatur nobis dolor. Illo similique tenetur voluptates suscipit, quibusdam facere totam iusto voluptatibus delectus maiores reiciendis vero rerum hic deserunt quo autem modi doloribus dolor? Debitis, praesentium. Earum, possimus incidunt atque quia, error aliquid, officia accusamus dolor nisi explicabo consectetur dolore reprehenderit assumenda iste quae numquam veritatis? Porro hic eaque, nesciunt ea obcaecati fugit maxime consectetur. Eius culpa quis omnis amet, rerum reprehenderit exercitationem quae quaerat. Autem dolorem fuga quod quis rerum, similique tempora soluta a facilis voluptatum aliquam repellat architecto culpa doloremque quia ad nesciunt. Vero fuga id iusto blanditiis earum fugiat inventore consequatur ipsa facere, doloremque nobis aspernatur distinctio maxime nihil illum, et reiciendis maiores corporis iste facilis voluptatum reprehenderit. Autem beatae, dolores sint ipsam praesentium ex, fuga, ipsa quisquam temporibus fugit? Quia omnis nisi hic deserunt repellat officiis est.</p>
            </div>
        </div> */}

        <div className='bg-gradient-to-br from-blue-50 to-white min-h-screen py-12 px-4 md:px-16'>
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-3 tracking-tight">About Our School</h2>
            <p className='text-center text-gray-600 mb-8'>Inspiring minds | Building futures | Since 2015</p>

            {/* Year */}
            <div className='text-center mb-10'>
                <span className='inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full shadow-sm'>
                    🎓 Established: <strong>2015</strong>
                </span>
            </div>

            {/* About Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                {/* Text Content */}
                <div className='text-gray-700 space-y-5 text-justify text-base sm:text-lg leading-relaxed'>
                    <p>
                        <span className='font-bold text-blue-800'>digital alchemy Public School</span> is a center of excellence where
                        education meets inspiration. Our journey began with a vision to create a holistic learning space that
                        fosters growth, curiosity, and compassion.
                    </p>
                    <p>
                        We are more than just a school — we are a community. With modern infrastructure, experienced educators,
                        and a nurturing environment, we ensure our students evolve into confident global citizens.
                    </p>
                    <p>
                        Our curriculum blends academics, arts, sports, and life skills — shaping every child’s future with values
                        and vision.
                    </p>
                    <p>
                        Come, be a part of a school where dreams are nurtured and leaders are born.
                    </p>
                </div>

                {/* Principal Card */}
                <div className='flex justify-center'>
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm transform hover:scale-105 transition-all duration-500">
                        <img
                            src="https://viaaninternationalschool.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-13-at-22.06.07-1-480x800.jpg"
                            alt="Principal"
                            className="rounded-t-2xl h-100 w-full object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-blue-800 mb-1">Ms. Sujata Singh</h3>
                            <p className="text-gray-600 text-sm">Principal, ABC Public School</p>
                            <p className="mt-3 text-gray-700 text-sm">
                                A visionary leader passionate about shaping lives with dedication, discipline, and love for learning.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Section */}
            <div className='mt-16 max-w-5xl mx-auto px-3 sm:px-10'>
                <h2 className='text-3xl sm:text-4xl font-bold text-blue-800 text-center mb-6'>Principal's Message</h2>
                <p className='text-justify text-gray-700 text-base sm:text-lg leading-relaxed'>
                    Welcome to ABC Public School! Here, we believe that education is not just about books — it's about shaping
                    young hearts and minds to thrive in a changing world. We are committed to building not only scholars but
                    also strong, empathetic, and responsible individuals. Every student who walks through our doors is a story in
                    the making, and we are honored to be part of their journey. Together, let's build futures filled with knowledge,
                    confidence, and kindness.
                </p>
            </div>
        </div>


    </>
}

export default About