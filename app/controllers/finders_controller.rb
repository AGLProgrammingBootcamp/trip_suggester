#suggest structure
Suggestions = Struct.new(:hotel_name,:address, :prefcode, :hotel_sample_fare, :sta_arrival, :trans_fare)

#main app controller
class FindersController < ApplicationController
  before_action :set_finder, only: [:show, :edit, :update, :destroy]

  attr_accessor :ons_matched, :suggestions
  # GET /finders
  # GET /finders.json
  def index
    @finders = Finder.all

    @input_bgt        = params[:input_bgt].to_i   #予算総額
    @deperture_place  = params[:deperture_place]  #出発駅

    #for hotel api
    @bgt_hotel      = (@input_bgt * 0.7).ceil   #ホテル予算
    @bgt_hotel_sup  = (@bgt_hotel * 1.1).ceil  #予算範囲の上限値
    @bgt_hotel_inf  = (@bgt_hotel * 0.8).ceil  #予算範囲の下限値

    @suggestions    = Array.new()

    @suggestions    << {:hotel_name => "ホテル1号", :address => "別府1-1-1", :prefcode => "0000", :hotel_sample_fare => "10000", :sta_arrival =>"別府", :trans_fare => "4300"}
    @suggestions    << {:hotel_name => "ホテル2号", :address => "別府2-2-2", :prefcode => "0000", :hotel_sample_fare => "20000", :sta_arrival =>"別府", :trans_fare => "4300"}
    @suggestions    << {:hotel_name => "ホテル3号", :address => "別府3-3-3", :prefcode => "0000", :hotel_sample_fare => "30000", :sta_arrival =>"別府", :trans_fare => "4300"}
    @suggestions    << {:hotel_name => "ホテル4号", :address => "別府4-4-4", :prefcode => "0000", :hotel_sample_fare => "40000", :sta_arrival =>"別府", :trans_fare => "4300"}
    @suggestions    << {:hotel_name => "ホテル5号", :address => "別府5-5-5", :prefcode => "0000", :hotel_sample_fare => "50000", :sta_arrival =>"別府", :trans_fare => "4300"}
    #@onsen_togo   = "別府温泉"
    #@ons_matched  = Finder.where(hotel_sample_fare: @bgt_hotel_inf..@bgt_hotel_sup).where(onsen_name: @onsen_togo)
  end

  # GET /finders/1
  # GET /finders/1.json
  def show
  end

  # GET /finders/new
  def new
    @finder = Finder.new
  end

  # GET /finders/1/edit
  def edit
  end

  # POST /finders
  # POST /finders.json
  def create
    @finder = Finder.new(finder_params)

    respond_to do |format|
      if @finder.save
        format.html { redirect_to @finder, notice: 'Finder was successfully created.' }
        format.json { render :show, status: :created, location: @finder }
      else
        format.html { render :new }
        format.json { render json: @finder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /finders/1
  # PATCH/PUT /finders/1.json
  def update
    respond_to do |format|
      if @finder.update(finder_params)
        format.html { redirect_to @finder, notice: 'Finder was successfully updated.' }
        format.json { render :show, status: :ok, location: @finder }
      else
        format.html { render :edit }
        format.json { render json: @finder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /finders/1
  # DELETE /finders/1.json
  def destroy
    @finder.destroy
    respond_to do |format|
      format.html { redirect_to finders_url, notice: 'Finder was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_finder
      @finder = Finder.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def finder_params
      params.require(:finder).permit(:hotel_id, :hotel_name, :hotel_sample_fare, :onsen_name)
    end
end

