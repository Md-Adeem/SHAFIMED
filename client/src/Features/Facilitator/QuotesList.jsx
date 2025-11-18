import React, { useEffect, useState, useMemo } from "react";
import api from "../../lib/api";
import FacilitatorLayout from "../../components/layout/FacilitatorLayout";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import QuotesShimmer from "../../components/ui/QuotesShimmer";

export default function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/quotes");
        setQuotes(response.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch quotes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const dateValue = quote.date || quote.createdAt || quote.updatedAt;
      const quoteDate = dateValue ? new Date(dateValue) : null;

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      const normalizedCountry = quote.country?.toLowerCase() || "";
      const normalizedCity = quote.city?.toLowerCase() || "";
      const normalizedName = quote.name?.toLowerCase() || "";
      const normalizedDescription = quote.description?.toLowerCase() || "";

      return (
        (!q ||
          normalizedName.includes(q.toLowerCase()) ||
          normalizedDescription.includes(q.toLowerCase())) &&
        (!country || normalizedCountry.includes(country.toLowerCase())) &&
        (!city || normalizedCity.includes(city.toLowerCase())) &&
        (!name || normalizedName.includes(name.toLowerCase())) &&
        (!start || !quoteDate || quoteDate >= start) &&
        (!end || !quoteDate || quoteDate <= end)
      );
    });
  }, [quotes, q, country, city, name, startDate, endDate]);

  const refresh = async () => {
    try {
      const { data } = await api.get("/quotes");
      setQuotes(data || []);
    } catch (err) {
      console.error("Error refreshing quotes:", err);
    }
  };

  if (loading)
    return (
      <FacilitatorLayout title="Quotes">
        <QuotesShimmer />
      </FacilitatorLayout>
    );

  if (error)
    return (
      <FacilitatorLayout title="Quotes">
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      </FacilitatorLayout>
    );

  return (
    <FacilitatorLayout title="Quotes" actions={<Button onClick={refresh}>Refresh</Button>}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer">
          <div className="text-gray-500 text-sm">Total Quotes</div>
          <div className="text-3xl font-bold">{quotes.length}</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer">
          <div className="text-gray-500 text-sm">Filtered Quotes</div>
          <div className="text-3xl font-bold">{filteredQuotes.length}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or description"
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Search by country"
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search by city"
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by patient name"
            className="px-3 py-2 border rounded-lg w-full"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setQ("");
              setCountry("");
              setCity("");
              setName("");
              setStartDate("");
              setEndDate("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </Card>

      {/* Quotes List */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote) => (
            <Card
              key={quote._id || quote.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Patient: {quote.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">
                  Mobile: {quote.countryCode} {quote.mobile}
                </span>
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">
                  Location: {quote.city}, {quote.country}
                </span>
              </p>
              <p className="text-gray-700 mb-4">
                Description: {quote.description}
              </p>
              <p className="text-xs text-gray-400">Quote ID: {quote.id}</p>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10 col-span-full">
            No quotes found.
          </p>
        )}
      </div>
    </FacilitatorLayout>
  );
}
