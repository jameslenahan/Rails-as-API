class CreateHands < ActiveRecord::Migration[6.0]
  def change
    create_table :hands do |t|
      t.string :name
      t.integer :value
      t.string :description

      t.timestamps

    end
  end
end
