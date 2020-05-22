class HandSerializer
  def initialize(hand_object)
    @hand = hand_object

  end

  def to_serialized_json
    options = {
        except: [:updated_at, :created_at]
    }
    @hand.to_json(options)

  end
end