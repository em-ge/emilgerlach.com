# http://94.130.107.104:11000/


from flask import Flask, render_template, request

# from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/blog")
def blog():
    return render_template("index_blog.html")


@app.route("/blog/strudel")
def article_strudel():
    return render_template("index_strudel.html")


@app.route("/blog/grenzen-schmuck-und-uhrenindustrie-in-pf")
def article_grenzen_schmuck_und_uhrenindustrie_in_pf():
    return render_template("index_grenzen_schmuck_und_uhrenindustrie_in_pf.html")


@app.route("/blog/portus-wie-die-roemer-wohnten")
def article_portus_wie_die_roemer_wohnten():
    return render_template("index_portus_wie_die_roemer_wohnten.html")


@app.route("/dev")
def dev():
    return render_template(
        "index_dev.html",
    )


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# security


# Virtual device 'sata0:1' will start disconnected.


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=11000)
