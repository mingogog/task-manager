import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const validationSchema = z
  .object({
    title: z.string().min(1, { message: "Title should be at least 3 characters" }).max(50, {
      message: "String must contain at most 50 character(s)"
    }),
    dueDate: dateSchema,
    category: z.enum(categories, {
      errorMap: (issue, ctx) => ({ message: 'Category is required!' })
    })
  })

type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.title && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.title?.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.dueDate && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="dueDate"
            type="date"
            placeholder="Due Date"
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.dueDate?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="category"
        >
          Category
        </label>
        <select {...register("category")} id="category" className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="" selected></option>
          {categories.map(c=><option value={c}>{c}</option>)}
        </select>
        {errors.category && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.category?.message}
          </p>
        )}
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;