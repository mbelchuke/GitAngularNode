var mongoose      = require('mongoose');
var crypto        = require('crypto');
var Schema        = mongoose.Schema;

var UserSchema    = new Schema({
    firstname   :   String,
    lastname    :   String,
    age         :   { type: Number, min: 18, max: 65 },
    username    :   String,
    password    :   String,
    email       :   String,
    role        :   String,
    created_at  :   { type: Date },
    updated_at  :   { type: Date }
});

UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;

    // if the type name is 'created_at' then store todays date as value into db
    if ( !this.created_at ) {
	this.created_at = now;
    }

    // if the type name is 'password', then md5 hash the value into db
    if (this.password) {
	var md5 = crypto.createHash('md5');
	this.password = md5.update(this.password).digest('hex');
    }

    next();
});

// export the schema
module.exports = mongoose.model('User', UserSchema);
