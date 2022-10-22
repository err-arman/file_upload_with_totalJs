exports.install = function () {
	ROUTE('GET /upload', upload_file_view);
	ROUTE('POST /upload', upload_data,['upload'], 1024 * 5);
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
		obj.url = '/download/' + obj.id + '.' + obj.ext;

		console.log(obj);
		file.fs('files', obj.id, function (err) {
			if (err) {
				output.push(err);
			}
			next();
		}, function () {
			self.json(output);
		});
	});
	self.redirect('upload');
};