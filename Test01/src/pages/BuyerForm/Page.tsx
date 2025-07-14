
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

interface IFormInput {
    name: string;
    email: string;
    address: string;
}

const schema = yup
    .object({
        name: yup
            .string()
            .required('Name is required')
            .min(2, 'Minimum 2 characters'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        address: yup
            .string()
            .required('Address is required')
            .min(5, 'Minimum 5 characters'),
    })
    .required();

export default function BuyerFormPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            address: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        reset();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Buyer Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <input
                                {...register('address')}
                                type="text"
                                id="address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your address"
                            />
                            {errors.address && (
                                <>
                                    <p className="text-red-600">{errors.address?.message}</p>
                                    {console.log('Address Error:', errors.address?.message)}
                                </>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}