class CreateOnsens < ActiveRecord::Migration
  def change
    create_table :onsens do |t|
      t.integer :hotel_id
      t.string :hotel_name
      t.string :postcode
      t.string :hotel_address
      t.string :hotel_pict
      t.integer :hotel_sample_fare
      t.string :onsen_name

      t.timestamps null: false
    end
  end
end
