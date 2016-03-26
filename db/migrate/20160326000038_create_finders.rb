class CreateFinders < ActiveRecord::Migration
  def change
    create_table :finders do |t|
      t.integer :hotel_id
      t.string :hotel_name
      t.integer :hotel_sample_fare
      t.string :onsen_name

      t.timestamps null: false
    end
  end
end
