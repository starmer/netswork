class DiagramsController < ApplicationController
  before_filter :setup_client_uuid
  # GET /diagrams
  # GET /diagrams.xml
  # GET /diagrams.json
  def index
    @diagrams = Diagram.where("cookie = ?", @client_uuid).where(:shared => false)
    puts @client_uuid
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @diagrams }
      format.json { render :json => @diagrams }
    end
  end
  
  def shared
    @diagrams = Diagram.where(:shared => true)
    puts @client_uuid
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @diagrams }
      format.json { render :json => @diagrams }
    end
  end

  # GET /diagrams/1
  # GET /diagrams/1.xml
  # GET /diagrams/1.json
  def show
    @diagram = Diagram.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @diagram }
      format.json { render :json => @diagram }
    end
  end

  # GET /diagrams/new
  # GET /diagrams/new.xml
  # GET /diagrams/new.json
  def new
    @diagram = Diagram.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @diagram }
      format.json  { render :json => @diagram }
    end
  end

  # GET /diagrams/1/edit
  def edit
    @diagram = Diagram.find(params[:id])
  end

  # POST /diagrams
  # POST /diagrams.xml
  # POST /diagrams.json
  def create
    @diagram = Diagram.new(params[:diagram])
    @diagram.cookie = @client_uuid;
    
    respond_to do |format|
      if @diagram.save
        format.html { redirect_to(@diagram, :notice => 'Diagram was successfully created.') }
        format.xml  { render :xml => @diagram, :status => :created, :location => @diagram }
        format.json { render :json => @diagram, :callback => params[:callback] }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @diagram.errors, :status => :unprocessable_entity }
        format.json  { render :json => @diagram.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /diagrams/1
  # PUT /diagrams/1.xml
  # PUT /diagrams/1.json
  def update
    @diagram = Diagram.find(params[:id])

    respond_to do |format|
      if @diagram.update_attributes(params[:diagram])
        format.html { redirect_to(@diagram, :notice => 'Diagram was successfully updated.') }
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @diagram.errors, :status => :unprocessable_entity }
        format.json  { render :json => @diagram.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /diagrams/1
  # DELETE /diagrams/1.xml
  # DELETE /diagrams/1.json
  def destroy
    @diagram = Diagram.find(params[:id])
    @diagram.destroy

    respond_to do |format|
      format.html { redirect_to(diagrams_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
    end
  end
  
  def setup_client_uuid
    @client_uuid = cookies[:client_uuid]
    if !@client_uuid
      @client_uuid = cookies.permanent[:client_uuid] = rand(36**8).to_s(36);
    end
  end
end
