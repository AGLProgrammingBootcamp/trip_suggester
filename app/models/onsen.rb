class Onsen < ActiveRecord::Base
validates   :hotel_id , presence: { message: "please input"}
validates   :hotel_name , presence: { message: "please input"}
validates   :postcode , presence: { message: "please input"}
validates   :hotel_address , presence: { message: "please input"}
validates   :hotel_pict , presence: { message: "please input"}
validates   :hotel_sample_fare , presence: { message: "please input"}
validates   :onsen_name , presence: { message: "please input"}

end
