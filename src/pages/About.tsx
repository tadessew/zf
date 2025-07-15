import React from 'react';
import { Award, Users, Leaf, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is handcrafted with attention to detail and built to last generations.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Materials',
      description: 'We source eco-friendly materials and follow sustainable practices in all our work.',
    },
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Your vision drives our design process, ensuring personalized solutions every time.',
    },
    {
      icon: Target,
      title: 'Timeless Design',
      description: 'We create furniture that transcends trends and remains beautiful for years to come.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Head Designer',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      bio: 'With over 15 years of experience in furniture design, Sarah founded FurniCraft to bring sustainable, beautiful furniture to modern homes.',
    },
    {
      name: 'David Chen',
      role: 'Master Craftsman',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      bio: 'David brings traditional woodworking techniques to contemporary design, ensuring each piece meets our high standards.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      bio: 'Emily ensures every project runs smoothly from concept to completion, maintaining our commitment to quality and timelines.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-amber-700">FurniCraft</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about creating beautiful, sustainable furniture that transforms your space 
              and stands the test of time. Every piece tells a story of craftsmanship, quality, and care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, FurniCraft began as a small workshop with a big dream: to create 
                furniture that combines traditional craftsmanship with modern design sensibilities. 
                What started as a passion project has grown into a trusted name in custom furniture design.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that furniture should be more than functional—it should be beautiful, 
                sustainable, and uniquely yours. Every piece we create is a collaboration between 
                our skilled craftspeople and our clients, resulting in furniture that perfectly 
                fits your space and style.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-700 mb-2">500+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-700 mb-2">14</h3>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg"
                alt="Our workshop"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="h-10 w-10 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The talented people behind every piece
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-amber-700 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600">
              We're proud to be recognized for our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <Award className="h-12 w-12 text-amber-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Best Furniture Design 2023
              </h3>
              <p className="text-gray-600">Interior Design Magazine</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sustainable Business Award
              </h3>
              <p className="text-gray-600">Green Business Council</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customer Choice Award
              </h3>
              <p className="text-gray-600">Home & Living Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;