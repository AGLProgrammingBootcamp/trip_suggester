class OnsensController < ApplicationController
    
    def index
       @onsens  = Onsen.all
    end
   
    def show
       @onsen = Onsen.find(params[:id])
    end
    
    def new
       @onsen = Onsen.new
    end
   
    def create
       @onsen = Onsen.new(onp1, onp2)
       @onsen.save
       redirect_to onsens_path
    end

    private
        def onp1
            params[:onsen].permit(:id)
        end
        def onp2
            params[:onsen].permit(:hotel_id)
        end
        def onp3
            params[:onsen].permit(:hotel_name)
        end
        def onp4
            params[:onsen].permit(:postcode)
        end
        def onp5
            params[:onsen].permit(:hotel_pict)
        end
        def onp6
            params[:onsen].permit(:hotel_sample_fare)
        end
        def onp7
            params[:onsen].permit(:onsen_name)
        end

end