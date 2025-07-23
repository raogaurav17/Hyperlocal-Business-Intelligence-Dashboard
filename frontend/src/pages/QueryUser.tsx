import { useState } from "react";

const QueryUser = () => {
  const [form, setForm] = useState({
    industry: "",
    product: "",
    salesRegion: "",
    salesVolume: "",
    helpType: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle the form data here (e.g., send to backend)
    alert("Form submitted!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello, I am here to help you in your business</h1>
      <p className="text-gray-600">Please provide me relevant information to help you.</p>
      <form className="space-y-4 flex flex-wrap justify-between" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1" htmlFor="industry">Industry</label>
          <input
            id="industry"
            name="industry"
            type="text"
            className="w-[40%] border min-w-[400px] rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g. Retail, Pharma, Electronics"
            value={form.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="product">Product/Service</label>
          <input
            id="product"
            name="product"
            type="text"
            className="w-[40%] min-w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g. Laptops, Medicines, Shoes"
            value={form.product}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="salesRegion">Sales Region</label>
          <input
            id="salesRegion"
            name="salesRegion"
            type="text"
            className="w-[40%] border min-w-[400px] rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={form.salesRegion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="salesVolume">Monthly Sales Volume</label>
          <input
            id="salesVolume"
            name="salesVolume"
            type="number"
            className="w-[40%] border rounded min-w-[400px] px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g. 1000"
            value={form.salesVolume}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="helpType">What help do you need?</label>
          <select
            id="helpType"
            name="helpType"
            className="w-[40%] min-w-[400px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={form.helpType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select help needed</option>
            <option value="market-research">Market Research</option>
            <option value="sales-strategy">Sales Strategy</option>
            <option value="lead-generation">Lead Generation</option>
            <option value="competitor-analysis">Competitor Analysis</option>
            <option value="distribution">Distribution/Logistics</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="details">Additional Details</label>
          <textarea
            id="details"
            name="details"
            className="w-full border min-w-[400px] rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Describe your needs in detail..."
            value={form.details}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-100 text-blue-900 dark:bg-blue-200 dark:text-blue-900 py-2 px-4 rounded hover:bg-blue-200 dark:hover:bg-blue-300 transition-colors font-semibold shadow border border-blue-200 dark:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QueryUser;