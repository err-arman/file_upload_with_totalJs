exports.install = function () {
	ROUTE('GET /upload', upload_file_view);
	ROUTE('POST /upload', upload_data, 10000);
	ROUTE('GET /', view_home_page);
};

function view_home_page() {
	this.view('index');
};

function upload_file_view() {
	var self = this;
	self.view('upload');
};

function upload_data() {
	var self = this;
	var obj = {};
	var output = [];
	self.files.wait(function (file, next) {
		obj.id = UID();
		obj.name = file.filename;
		obj.size = file.size;
		obj.type = file.type;
		obj.ext = file.extension;
		
		file.fs('upload', obj.id, obj.ext, function (err) {
			if (err) {
				output.push(err);
			}
			next();
		})
		console.log(obj)
	})
	self.redirect('upload');
};