# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140130091744) do

  create_table "comments", force: true do |t|
    t.string   "title",            limit: 50, default: ""
    t.text     "comment"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.integer  "user_id"
    t.string   "role",                        default: "comments"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["commentable_type"], name: "index_comments_on_commentable_type", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "days", force: true do |t|
    t.string   "name"
    t.integer  "sequence"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "days_diets", force: true do |t|
    t.integer "day_id"
    t.integer "diet_id"
  end

  create_table "days_meal_types", force: true do |t|
    t.integer "day_id"
    t.integer "meal_type_id"
  end

  create_table "diets", force: true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "walk_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "discussions", force: true do |t|
    t.string   "name"
    t.text     "text"
    t.integer  "user_id"
    t.integer  "walk_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "equipment", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "equipment_type_id"
    t.decimal  "weight",              precision: 10, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "equipment_type_name"
    t.string   "image"
  end

  create_table "equipment_sets", force: true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "walk_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "equipment_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "galleries", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meal_products", force: true do |t|
    t.integer  "meal_type_id"
    t.integer  "product_id"
    t.integer  "product_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meal_types", force: true do |t|
    t.string   "name"
    t.string   "meal_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "paintings", force: true do |t|
    t.string   "name"
    t.integer  "gallery_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
  end

  create_table "product_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_utkonos"
    t.integer  "parent_id"
  end

  create_table "products", force: true do |t|
    t.string   "name"
    t.string   "kcals"
    t.string   "fats"
    t.string   "proteins"
    t.string   "carbohydrates"
    t.integer  "product_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_utkonos"
    t.text     "description"
    t.string   "price"
    t.string   "link"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
    t.string   "username"
    t.string   "provider"
    t.integer  "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "votes", force: true do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

  create_table "walk_types", force: true do |t|
    t.string   "name"
    t.string   "walk_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "walks", force: true do |t|
    t.string   "name"
    t.integer  "category"
    t.integer  "user_id"
    t.integer  "walk_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
