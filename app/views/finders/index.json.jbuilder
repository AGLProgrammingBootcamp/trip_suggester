json.array!(@finders) do |finder|
  json.extract! finder, :id, :hotel_id, :hotel_name, :hotel_sample_fare, :onsen_name
  json.url finder_url(finder, format: :json)
end
