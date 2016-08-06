# =====================================================================
# Enter database URI and credentials.
# =====================================================================
db_name = "three_on_three"
db_user = "chetnet"
db_pass = "sQrR4cGennT6SCUj"
db_uri = "chetdb.cltke8ax3p9j.us-west-1.rds.amazonaws.com"

# =====================================================================
# Build the DB URI here for SQLAlchemy.
# =====================================================================
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://" + db_user + ":" + db_pass + "@" + \
                            db_uri + "/" + db_name + "?charset=utf8mb4"
SQLALCHEMY_TRACK_MODIFICATIONS = True
